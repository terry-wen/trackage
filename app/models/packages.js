var mongoose = require('mongoose');

// define our packages model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Package', {
   code : {type : String, default: ''}
});