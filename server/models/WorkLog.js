const logSchema = new mongoose.Schema({
  userId: String,
  content: String,
  date: String,
});

module.exports = mongoose.model('WorkLog', logSchema);