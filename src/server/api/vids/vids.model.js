'use strict';

import mongoose from 'mongoose';

var VidSchema = new mongoose.Schema({
	id: Number,
	title: String,
	videoCode: String,
	desc: String
});

export default mongoose.model('Vids', VidSchema);
