/**
 * Date conversion methods.
 *
 * @param  {String} unix timestamp or a natural language date
 * @return {String} json object ex. { "unix": 1450137600, "natural": "December 15, 2015" }
 */

module.exports = {

  /**
  * Return json object with both dates.
  *
  * @param  {String} aDate containing one of the specific date
  * @return {String} json object ex. { "unix": 1450137600, "natural": "December 15, 2015" }
  */
  getShortURL: function() {

  	return Math.random().toString(36).substr(2, 5);
    
  }

  
};