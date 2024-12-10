const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
const QRCode = require('qrcode');
require('./assets/Wavehaus-66Book.js');
require('./assets/Wavehaus-128Bold.js');

const TWO_SIDED = true;
const CUR_DESIGN = 'judges';

const colors = {
    white: '#FFFFFF',
    primary: '#B2CDDF',
    background: '#2F1244',
    black: '#000000'
}

const DESIGNS = {
    teams: {
        background: '56x83BG-P.png',
        data: 'teams.json',
        output: 'teams.pdf',
        layout:  {
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
    },
    committee: {
        background: '56x83BG-C.png',
        data: 'committee.json',
        output: 'committee.pdf',
        layout:  {
            width: 56,
            height: 83,
            text: [
                {
                    key: 'first_name',
                    font: 'Wavehaus-128Bold',
                    color: colors.primary,
                    size: 20,
                    y: 35
                },
                {
                    key: 'last_name',
                    font: 'Wavehaus-128Bold',
                    color: colors.primary,
                    size: 20,
                    y: 43
                },
                {
                    key: 'role',
                    font: 'Wavehaus-66Book',
                    color: colors.white,
                    size: 16,
                    y: 52
                },
                {
                    key: 'role2',
                    font: 'Wavehaus-66Book',
                    color: colors.white,
                    size: 16,
                    y: 58.5
                }
            ],
        }
    },
    mentors: {
        background: '56x83BG-M.png',
        data: 'mentors.json',
        output: 'mentors.pdf',
        layout:  {
            width: 56,
            height: 83,
            text: [
                {
                    key: 'first_name',
                    font: 'Wavehaus-128Bold',
                    color: colors.primary,
                    size: 20,
                    y: 35
                },
                {
                    key: 'last_name',
                    font: 'Wavehaus-128Bold',
                    color: colors.primary,
                    size: 20,
                    y: 43
                },
                {
                    key: '!Mentor',
                    font: 'Wavehaus-66Book',
                    color: colors.white,
                    size: 16,
                    y: 52
                },
            ],
            image: {
                y: 61,
                width: 30,
                height: 12,
                vgw: 286/742, // aspect ratio of image
                wadsih: 394/1536,
                visagio: 556/2500,
                deloitte: 136/728
            }
        }
    },
    judges: {
        background: '56x83BG-J.png',
        data: 'judges.json',
        output: 'judges.pdf',
        layout:  {
            width: 56,
            height: 83,
            text: [
                {
                    key: 'first_name',
                    font: 'Wavehaus-128Bold',
                    color: colors.primary,
                    size: 20,
                    y: 35
                },
                {
                    key: 'last_name',
                    font: 'Wavehaus-128Bold',
                    color: colors.primary,
                    size: 20,
                    y: 43
                },
                {
                    key: '!Judge',
                    font: 'Wavehaus-66Book',
                    color: colors.white,
                    size: 16,
                    y: 52
                },
            ]
        }
    }
}

// load data
const input = require(`./data/${DESIGNS[CUR_DESIGN].data}`);

// create new pdf
const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
});

// read background image from our canva design
const imgData = fs.readFileSync(path.join(__dirname, 'assets', DESIGNS[CUR_DESIGN].background));

// values taken from our canva design
const id = DESIGNS[CUR_DESIGN].layout;

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
    let data = [];
    if (CUR_DESIGN === 'teams') {
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
    } else {
        data = input.members;
    }

    for (let i = 0; i < numProcessed; i++) {
        const xIndex = i % idPerRow;
        const yIndex = Math.floor(i / idPerRow) % idPerCol;
        let x = marginX + xIndex * (id.width + marginX);
        let y = marginY + yIndex * (id.height + marginY);

        if (CUR_DESIGN === 'teams') {
            console.log(`[${i < 9 ? " " + (i+1) : (i+1)}] ${data[i].team} - ${data[i].name}`);
        } else {
            console.log(`[${i < 9 ? " " + (i+1) : (i+1)}] ${data[i].first_name} ${data[i].last_name}`);
        }
        addIDCard(data[i], x, y);

        const isLastItem = i + 1 === numProcessed;
        const needNewPage = i + 1 < numProcessed && (i + 1) % (itemsPerPage) === 0;

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
        // doc.rect(x, y, id.width, id.height);
        doc.addImage(imgData, 'PNG', x, y, id.width, id.height);


        for (let i = 0; i < id.text.length; i++) {
            const text = id.text[i];
            doc.setFont(text.font);
            doc.setFontSize(text.size);
            doc.setTextColor(text.color);
            const textX = text.x || id.width / 2;
            const textY = text.y || id.height / 2;
            let textToAdd;
            if (text.key.startsWith('!')) {
                textToAdd = text.key.substring(1);
            } else {
                textToAdd = data[text.key];
            }
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
        if (id.qr) {
            const qrX = id.qr.x || (id.width - id.qr.size) / 2;
            const qrY = id.qr.y || id.size / 2;
            doc.addImage(data.image, 'JPEG', x + qrX, y + qrY, id.qr.size, id.qr.size);
        }

        if (id.image && data.image) {
            const imgX = id.image.x || (id.width - id.image.width) / 2;
            const imgY = id.image.y || id.size / 2;
            const imgData = fs.readFileSync(path.join(__dirname, 'assets', data.image));
            const name = data.image.split('.png')[0];
            const imgHeight = id.image.height;
            const imgPreHeight = id.image.width * id.image[name];
            const heightDiff = (imgHeight - imgPreHeight) / 2;
            doc.addImage(imgData, 'PNG', x + imgX, y + imgY + heightDiff, id.image.width, id.image.width * id.image[name]);
        }
        
    }

    const outFile = DESIGNS[CUR_DESIGN].output;
    doc.save(outFile);
    console.log(`\nSuccess! Saved to ${outFile}`);
}

async function setup() {
    // generate qr codes and count number of participants
    if (CUR_DESIGN === 'teams') {
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
    } else {
        return input.members.length;
    }
}

setup().then((numProcessed) => {
    main(numProcessed);
}).catch((err) => {
    console.error(err);
});
