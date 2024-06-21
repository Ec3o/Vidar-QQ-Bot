const axios = require('axios');
const db = require('./db');

const NAPCAT_API_URL = 'http://127.0.0.1:6000';

const handleGroupMessage = async (data, groupMessageHistory) => {
    const groupId = data.group_id;
    const userId = data.user_id;
    const rawMessage = data.raw_message;

    if (!groupMessageHistory[groupId]) {
        groupMessageHistory[groupId] = [];
    }

    groupMessageHistory[groupId].push({ userId, rawMessage });

    if (groupMessageHistory[groupId].length > 5) {
        groupMessageHistory[groupId].shift();
    }

    const lastFiveMessages = groupMessageHistory[groupId];
    const isRepeating = lastFiveMessages.length === 5 && lastFiveMessages.every(msg => msg.rawMessage === rawMessage);

    if (isRepeating) {
        const lastUser = lastFiveMessages[lastFiveMessages.length - 1].userId;
        try {
            await axios.post(`${NAPCAT_API_URL}/delete_msg`, { message_id: data.message_id });
            await axios.post(`${NAPCAT_API_URL}/set_group_ban`, { group_id: groupId, user_id: lastUser, duration: 30 * 60 });
            await axios.post(`${NAPCAT_API_URL}/send_group_msg`, { group_id: groupId, message: '人应当为自我而活！' });
            console.log(`Banned user ${lastUser} for repeating messages.`);
        } catch (error) {
            console.error('Error handling repeated messages:', error);
        }
    }

    if (rawMessage.startsWith('%')) {
        const message = rawMessage.slice(1).trim();
        if (message) {
            try {
                let responseMessage = '';
                if (message.startsWith('help')) {
                    responseMessage = '可用命令: %help, %info, %ban <user_id>, %unban <user_id>, %blog <keyword>, %ping';
                } else if (message.startsWith('info')) {
                    responseMessage = '你好，我是流萤，最后一位格拉默铁骑，为了自我而活。飞萤扑火，向死而生！';
                } else if (message.startsWith('ban')) {
                    const userId = message.split(' ')[1];
                    if (userId) {
                        await axios.post(`${NAPCAT_API_URL}/set_group_ban`, { group_id: groupId, user_id: userId, duration: 30 * 60 });
                        responseMessage = `协议通过，执行焦土作战， ${userId} 已歼灭！`;
                    } else {
                        responseMessage = '索敌无效，请求指挥部命令！';
                    }
                } else if (message.startsWith('unban')) {
                    const userId = message.split(' ')[1];
                    if (userId) {
                        await axios.post(`${NAPCAT_API_URL}/set_group_ban`, { group_id: groupId, user_id: userId, duration: 0 });
                        responseMessage = `协议通过， ${userId} 保护作战完成！`;
                    } else {
                        responseMessage = '保护对象无效，请求指挥部命令！';
                    }
                } else if (message === 'ping') {
                    responseMessage = 'pong!';
                } else if (message.startsWith('blog')) {
                    const keyword = message.split(' ')[1];
                    if (keyword) {
                        const query = `SELECT blog FROM blogs WHERE nickname = '${keyword}'`;
                        console.log(`Query Executed: '${query}'`);
                        db.query(query, (err, results) => {
                            if (err) {
                                console.error('Database query error:', err);
                                responseMessage = '数据库查询出错，请稍后再试。';
                            } else if (results.length > 0) {
                                const link = results[0].blog;
                                responseMessage = `[CQ:at,qq=${userId}] 这里是你要的链接：${link}`;
                            } else {
                                responseMessage = `未找到关键词为 "${keyword}" 的博客链接。`;
                            }

                            axios.post(`${NAPCAT_API_URL}/send_group_msg`, { group_id: groupId, message: responseMessage })
                                .then(() => console.log(`Sent message: ${responseMessage}`))
                                .catch(error => console.error('Error sending message:', error));
                        });
                    } else {
                        responseMessage = 'Usage: %blog <keyword>';
                    }
                }

                if (!message.startsWith('blog')) {
                    await axios.post(`${NAPCAT_API_URL}/send_group_msg`, { group_id: groupId, message: responseMessage });
                    console.log(`Sent message: ${responseMessage}`);
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }
};

const handlePrivateMessage = async (data) => {
    const userId = data.user_id;
    const rawMessage = data.raw_message;

    if (rawMessage.startsWith('%')) {
        const message = rawMessage.slice(1).trim();
        if (message) {
            try {
                let responseMessage = '';
                if (message.startsWith('help')) {
                    responseMessage = '可用命令: %help, %info, %ping';
                } else if (message.startsWith('info')) {
                    responseMessage = '你好，我是流萤，最后一位格拉默铁骑，为了自我而活。飞萤扑火，向死而生！';
                } else if (message === 'ping') {
                    responseMessage = 'pong!';
                } else {
                    responseMessage = '未知命令，请输入 %help 查看可用命令。';
                }

                await axios.post(`${NAPCAT_API_URL}/send_private_msg`, { user_id: userId, message: responseMessage });
                console.log(`Sent message: ${responseMessage}`);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    }
};

module.exports = { handleGroupMessage, handlePrivateMessage };
