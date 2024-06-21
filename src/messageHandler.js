const axios = require('axios');
const db = require('./db');

const NAPCAT_API_URL = 'http://127.0.0.1:6000';

const handleGroupMessage = async (data, groupMessageHistory) => {
    const groupId = data.group_id;
    const userId = data.user_id;
    const selfId = data.self_id;
    const rawMessage = data.raw_message;

    if (userId === selfId) {
        // 如果消息是由机器人发送的，直接返回，防止无限复读
        return;
    }

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
                    responseMessage = '可用命令: %help, %info, %ban <user_id>, %unban <user_id>, %blog <keyword>, %ping, %vidar';
                } else if (message.startsWith('info')) {
                    responseMessage = '你好，我是流萤，最后一位格拉默铁骑，为了自我而活。飞萤扑火，向死而生！';
                } else if (message.startsWith('ban')) {
                    const targetUserId = message.split(' ')[1];
                    if (targetUserId) {
                        await axios.post(`${NAPCAT_API_URL}/set_group_ban`, { group_id: groupId, user_id: targetUserId, duration: 30 * 60 });
                        responseMessage = `协议通过，执行焦土作战， ${targetUserId} 已歼灭！`;
                    } else {
                        responseMessage = '索敌无效，请求指挥部命令！';
                    }
                } else if (message.startsWith('unban')) {
                    const targetUserId = message.split(' ')[1];
                    if (targetUserId) {
                        await axios.post(`${NAPCAT_API_URL}/set_group_ban`, { group_id: groupId, user_id: targetUserId, duration: 0 });
                        responseMessage = `协议通过， ${targetUserId} 保护作战完成！`;
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
                } else if (message.startsWith('vidar')) {
                    const images = [
                        'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhT5pinIxQqN9I-BBd16Tgkq9CXhqRje4hQg_goouPSTqf_shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhTu37jZpN67K7xW4XZmT5JPyQZ5rRiQ-QMg_gooq8SAq__shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhRgB88BqccK8d1tr5vf7Aaz62AcVRjX8QIg_goo3YuCrv_shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhQMPrFwQHeb4SN69f-LAJvkf--W-Bj-uwsg_gookI3asf_shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhQhaeh3ncv7v_KTkxiZjGKQsSzZDRiykAUg_goorpDptf_shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhRIsqdbvbnGS3a9BT8vzHKY0eKcoBif8Qcg_goo95C7tv_shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhQHmb6xEwKBSAClQGXy8LIs1jpmiRjY6RMg_goo1OSCt__shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhSbXk_-wH7KZf5_kP93iHzfUon7LBjqzwYg_goo-JqSuP_shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhR8EmfyieYBMm51u9jmmoZmaNp22xiVgA0g_gooi-fLuf_shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhQm0bqf7OuGMB66-BZpsNfvY2RhaBjujwog_goo68yWuv_shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhRZ5r0E5t76T9hE41kkQ1NuJFVLVhiYogog_gootabiu__shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhQkPjKIOZny7MqHi8adznYcLQRQYxilww0g_gooxpaVvP_shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhTrUoeUpKbSgqA1MNuCEgps1DOGohjgsQ8g_goo_vzzvP_shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhTr5lFogot8T6xa7EEdXQ86Zt42xxjDzgkg_goo76vSvf_shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhTYlM_GJQlzoqEkZ5UCMvwrpGAhSRjmvw8g_goo6Mqyvv_shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhSwLZxCgjVizacBUzq0Y-4FwkcPdBjU0xIg_goooNfKwf_shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhQmoClSOrnB_smhDY5mkSkQw_LFAhje3McCIP4KKO2HnMD_7IYDUIC7Lw&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M',
'https://multimedia.nt.qq.com.cn/download?appid=1406&fileid=CgoyNDk5MzAyNTMxEhRuzXNgeo4Qx9W8gFEMM5MXl-un2hjohAUg_googLfgw__shgNQgLsv&spec=0&rkey=CAMSKMa3OFokB_Tl1XzJ1uuCK5hgKGVx0ZxWbjj7hRLRwXn0jXOAWLVTA4M'
                    ];
                    const randomImage = images[Math.floor(Math.random() * images.length)];
                    console.log(`img:${randomImage}`)
                    responseMessage = `[CQ:image,file=${randomImage}]`;
                }

                {
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
    const selfId = data.self_id;
    const rawMessage = data.raw_message;

    if (userId === selfId) {
        // 如果消息是由机器人发送的，直接返回，防止无限复读
        return;
    }

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
