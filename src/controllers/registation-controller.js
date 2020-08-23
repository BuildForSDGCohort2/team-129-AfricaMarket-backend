module.exports = {
    user: (req, res) => {
        return res.status(200).json({
            success: true,
            message: "registations routes confirmed :)",
        })
    },

    /* createUsers: async (req, res) => {
        let ordersObj = req.body;
        let messageId = await publishMessage(pubSubClient, topicName, ordersObj);
        return res.status(200).json({
            success: true,
            message: `Message ${messageId} published :)`
        })
    }, */

};