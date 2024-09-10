const { Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({
                _id: req.params.thoughtId
            });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const reaction = await Reaction.create(req.body);
            const thought = await Thought.findOneAndUpdate(
                { _id: req.body.thoughtId },
                { $addToSet: { reactions: reaction._id } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: 'Reaction created, but found no thought with that ID',
                })
            }

            res.json('Created the reaction 🎉');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const reaction = await Reaction.findOneAndRemove({ _id: req.params.reactionId });

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction with this id!' });
            }

            const thought = await Thought.findOneAndUpdate(
                { reactions: req.params.reactionId },
                { $pull: { reactions: req.params.reactionId } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: 'Reaction deleted but no thought with this id!',
                });
            }

            res.json({ message: 'Reaction successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            console.log('You are adding a reaction');
            console.log(req.body);
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thought found with that ID :(' })
            }

            res.json(Thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reaction: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thought found with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}