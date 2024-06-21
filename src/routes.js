const express = require('express');
const { handleGroupMessage, handlePrivateMessage } = require('./messageHandler');

const router = express.Router();
let groupMessageHistory = {};

router.post('/report', async (req, res) => {
    const data = req.body;

    console.log(`Received message: ${JSON.stringify(data, null, 2)}`);

    if (data.message_type === 'group') {
        await handleGroupMessage(data, groupMessageHistory);
    } else if (data.message_type === 'private') {
        await handlePrivateMessage(data);
    }

    res.sendStatus(200);
});

module.exports = router;
