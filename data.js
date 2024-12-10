const TidyHQ = require("../../module");
const fs = require('fs');
require('dotenv').config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const THQ = new TidyHQ(ACCESS_TOKEN);

async function getTeamData() {
    const groups = await THQ.Groups.getGroups({search_terms: "2024-Hackathon-S2"});
    if (!groups.success) throw new Error("Failed to get groups");
    const groupId = groups.data[0].id;

    const contacts = await THQ.Contacts.getContactsInGroup(groupId);
    if (!contacts.success) throw new Error("Failed to get contacts");

    const fields = await THQ.CustomFields.getCustomFields();
    if (!fields.success) throw new Error("Failed to get custom fields");
    const targetField = fields.data.find(field => field.title === "Hackathon 2024 S2 Team");

    const events = await THQ.Events.getEvents({start_at: "2024-12-06"});
    if (!events.success) throw new Error("Failed to get events");
    const eventId = events.data[0].id;

    const tickets = await THQ.Tickets.getSoldTickets(eventId);
    if (!tickets.success) throw new Error("Failed to get tickets");

    const data = contacts.data.reduce((acc, contact) => {
        const team = contact.custom_fields.find(field => field.id === targetField.id);
        if (!team) throw new Error(`Contact ${contact.display_name} does not have a team assigned`);
        acc[contact.id] = {
            name: contact.display_name,
            team: team.value
        };
        return acc;
    }, {});

    for (const ticket of tickets.data) {
        const contact = data[ticket.contact_id];
        if (!contact) throw new Error(`Contact ${ticket.contact_id} not found`);
        contact.code = ticket.code;
    }

    const teams = Object.values(data).reduce((acc, contact) => {
        const team = acc.find(team => team.name === contact.team);
        if (!team) {
            acc.push({
                name: contact.team,
                members: []
            });
        }
        acc.find(team => team.name === contact.team).members.push({
            name: contact.name,
            code: contact.code
        });
        return acc;
    }, []);

    fs.writeFileSync('data/teams.json', JSON.stringify({teams}));
    console.log("Data written to data/teams.json");
}

async function getCommitteeData() {
    const groups = await THQ.Groups.getGroups({search_terms: "2024-Hackathon-S2-Organisers"});
    if (!groups.success) throw new Error("Failed to get groups");
    const groupId = groups.data[0].id;

    const contacts = await THQ.Contacts.getContactsInGroup(groupId);
    if (!contacts.success) throw new Error("Failed to get contacts");

    const data = contacts.data.map(contact => ({
        first_name: contact.first_name,
        last_name: contact.last_name,
        role: "", // DEFAULT, for now editing resulting file
        role2: "" // OVERFLOW LINE
    }));

    fs.writeFileSync('data/committee.json', JSON.stringify({members: data}));
    console.log("Data written to data/committee.json");
}

getTeamData();
// getCommitteeData();
