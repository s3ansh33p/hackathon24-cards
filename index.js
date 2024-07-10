const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
const QRCode = require('qrcode');
require('./Wavehaus-66Book.js');
require('./Wavehaus-128Bold.js');
const input = require('./input.json');

const TWO_SIDED = true;

// create new pdf
const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
});

// read background image from our canva design
const imgData = fs.readFileSync(path.join(__dirname, '56x83BG-P.png'));

const colors = {
    primary: '#FFB001',
    background: '#2F1244'
}

// values taken from our canva design
const id = {
    width: 56,
    height: 83,
    text: [
        {
            key: 'name',
            font: 'Wavehaus-128Bold',
            color: colors.primary,
            size: 20,
            y: 30
        },
        {
            key: 'team',
            font: 'Wavehaus-66Book',
            color: colors.primary,
            size: 18,
            y: 40
        },
    ],
    qr: {
        // will ultimately be qr code
        y: 45,
        size: 30,
        opts: {
            errorCorrectionLevel: 'H',
            type: 'image/jpeg',
            quality: 0.3,
            margin: 2,
            color: {
                dark: colors.primary + 'FF',
                light: colors.background + 'FF'
            }
        }
    }
}

// sizing for our lanyard id cards (3x3 grid)
const idPerRow = 3;
const idPerCol = 3;
const itemsPerPage = idPerRow * idPerCol;

// calculations
const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();

/*
    For example pageWidth = 210mm and pageHeight = 297mm
    Then 7.5 + 60 + 7.5 + 60 + 7.5 + 60 + 7.5 = 210 and is evenly spaced
    Same for height
*/
const marginX = (pageWidth - id.width * idPerRow) / (idPerRow + 1);
const marginY = (pageHeight - id.height * idPerCol) / (idPerCol + 1);

function main(numProcessed) {

    // converting into single array for easier iteration
    const data = [];
    for (let i = 0; i < input.teams.length; i++) {
        const team = input.teams[i];
        for (let j = 0; j < team.members.length; j++) {
            const member = team.members[j];
            data.push({
                name: member.name,
                team: team.name,
                image: member.image
            });
        }
    }

    for (let i = 0; i < numProcessed; i++) {
        const xIndex = i % idPerRow;
        const yIndex = Math.floor(i / idPerRow) % idPerCol;
        let x = marginX + xIndex * (id.width + marginX);
        let y = marginY + yIndex * (id.height + marginY);

        console.log(`[${i < 9 ? " " + (i+1) : (i+1)}] ${data[i].team} - ${data[i].name}`);
        addIDCard(data[i], x, y);

        const isLastItem = i + 1 === numProcessed;
        const needNewPage = i + 1 < numProcessed && (i + 1) % (idPerRow * idPerCol) === 0;

        if (needNewPage || isLastItem && TWO_SIDED) {
            doc.addPage();
            // if TWO_SIDED, need to get previous items and add to the back
            // however, must flip the x values as they will flip on page turn
            if (TWO_SIDED) {
                let itemsOnPage = (i + 1) % itemsPerPage;
                if (itemsOnPage == 0) itemsOnPage = itemsPerPage;
                for (let j = i; j > i - itemsOnPage; j--) {
                    const xIndex = j % idPerRow;
                    const yIndex = Math.floor(j / idPerRow) % idPerCol;
                    x = marginX + (idPerRow - xIndex - 1) * (id.width + marginX);
                    y = marginY + yIndex * (id.height + marginY);
                    addIDCard(data[j], x, y);
                }
                if (!isLastItem) doc.addPage();
            }
        }
    }

    function addIDCard(data, x, y) {
        doc.rect(x, y, id.width, id.height);
        doc.addImage(imgData, 'PNG', x, y, id.width, id.height);


        for (let i = 0; i < id.text.length; i++) {
            const text = id.text[i];
            doc.setFont(text.font);
            doc.setFontSize(text.size);
            doc.setTextColor(text.color);
            const textX = text.x || id.width / 2;
            const textY = text.y || id.height / 2;
            let textToAdd = data[text.key];

            // check if it will overflow, as if so, we'll reduce the font size so it fits
            const textWidth = doc.getStringUnitWidth(textToAdd) * text.size / doc.internal.scaleFactor;
            // we don't want the text to right up against the edge so we add a margin
            const sideMargin = 10;
            const maxWidth = id.width - sideMargin;
            if (textWidth > maxWidth) {
                const newFontSize = text.size * maxWidth / textWidth;
                doc.setFontSize(newFontSize);
                textToAdd = data[text.key];
            }
            doc.text(textToAdd, x + textX, y + textY, { align: text.align || 'center' });
        }

        // add qr code
        const qrX = id.qr.x || (id.width - id.qr.size) / 2;
        const qrY = id.qr.y || id.size / 2;
        doc.addImage(data.image, 'JPEG', x + qrX, y + qrY, id.qr.size, id.qr.size);
        
    }

    doc.save('out.pdf');
    console.log('\nSuccess! Saved to out.pdf');
}

async function setup() {
    // for testing/illustration
    const crypto = require('crypto');
    // generate qr codes and count number of participants
    let numProcessed = 0;
    const promises = [];
    for (let i = 0; i < input.teams.length; i++) {
        const team = input.teams[i];
        for (let j = 0; j < team.members.length; j++) {
            const member = team.members[j];
            member.image = await generateQRCode(member.code);
            numProcessed++;
        }
    }
    await Promise.all(promises);
    return numProcessed;
    
    async function generateQRCode(data) {
        return new Promise((resolve, reject) => {
            QRCode.toDataURL(data, id.qr.opts, function (err, url) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(url);
            });
        });
    }
}

setup().then((numProcessed) => {
    main(numProcessed);
}).catch((err) => {
    console.error(err);
});
