var SUIBlocker = (function() {
	function SUIBlocker() {
		this.isBlocked = false;
		this.templateInstance = false;
		this.message = new ReactiveVar(false);
		this.open = new ReactiveVar(false);
	}

  /**
   * Block UI with blur
   *
   * @param {string} 			[message] 						- Custom message to display
   * @param {boolean|int} [showClose=false] 		- Pass TRUE to show close button immediately (false for not at all), or integer in milliseconds to wait before showing close button
   * @param {int} 				[asyncTimeout=false] 	- Time in milliseconds to delay before returning resolved promise
   * @param {boolean} 		[autoUnblock=false] 	- Specify true to auto close/unblock after asyncTimeout
   * @returns {Promise<any>|boolean}
   */
  SUIBlocker.prototype.blur = function(message, showClose, asyncTimeout, autoUnblock ) {
  		return this.block( message, showClose, asyncTimeout, autoUnblock, true );
  };

  /**
	 * Async Timeout Block
	 *
	 * @async
   * @param {string} 			[message] 						- Custom message to display
   * @param {int}         [asyncTimeout=2000]   - Time in milliseconds to delay before returning resolved promise (default is 2000ms = 2s)
   * @param {boolean} 		[autoUnblock=false] 	- Specify true to auto close/unblock after asyncTimeout
   * @param {boolean|int} [showClose=false] 		- Pass TRUE to show close button immediately (false for not at all), or integer in milliseconds to wait before showing close button
   * @param {boolean}     [doBlur=false]        - Pass TRUE to enable background blurring
   * @returns {Promise<any>|boolean}
   */
  SUIBlocker.prototype.asyncBlock = function( message, asyncTimeout, autoUnblock, showClose, doBlur ) {
  		if( ! showClose ){
  			showClose = false;
			}
			if( ! asyncTimeout ){
  			asyncTimeout = 2000; // default of 2 seconds if not supplied
			}
  		return this.block( message, showClose, asyncTimeout, autoUnblock, doBlur );
  };

  /**
   * Async Timeout Blurring Block
   *
	 * @async
   * @param {string} 			[message] 						- Custom message to display
   * @param {int}         [asyncTimeout=2000]   - Time in milliseconds to delay before returning resolved promise (default is 2000ms = 2s)
   * @param {boolean} 		[autoUnblock=false] 	- Specify true to auto close/unblock after asyncTimeout
   * @param {boolean|int} [showClose=false] 		- Pass TRUE to show close button immediately, or integer in milliseconds to wait before showing close button
   * @returns {Promise<any>|boolean}
   */
  SUIBlocker.prototype.asyncBlur = function( message, asyncTimeout, autoUnblock, showClose ) {
  		if( ! showClose ){
  			showClose = false;
			}
			if( ! asyncTimeout ){
				asyncTimeout = 2000; // default of 2 seconds if not supplied
			}
  		return this.block( message, showClose, asyncTimeout, autoUnblock, true );
  };

  /**
   * Block UI
   *
   * @param {string} 			[message] 						- Custom message to display
   * @param {boolean|int} [showClose=false] 		- Pass TRUE to show close button immediately (false for not at all), or integer in milliseconds to wait before showing close button
   * @param {int} 				[asyncTimeout=false] 	- Time in milliseconds to delay before returning resolved promise
   * @param {boolean} 		[autoUnblock=false] 	- Specify true to auto close/unblock after asyncTimeout
   * @param {boolean}     [doBlur=false]        - Pass TRUE to enable background blurring
   * @returns {Promise<any>|boolean}
   */
	SUIBlocker.prototype.block = function( message, showClose, asyncTimeout, autoUnblock, doBlur ) {
		if (message == null) {
			message = false;
		}
		this.isBlocked = true;
		this.open.set(true);
		if (message) {
			this.message.set(message);
		}
		if (this.templateInstance) {
			Blaze.remove(this.templateInstance);
		}
		if ($('body')[0]) {
      if( doBlur ){
        $('body').addClass( 'blurring dimmed dimmable' );
      }
			this.templateInstance = Blaze.render(Template.SUIBlock, $('body')[0]);
		}

		$('html').addClass('SUIBlocked');

		if( showClose ){

			if( showClose === true ){
				$('#block-close').css( 'visibility', 'visible' );
			} else {

				this.timeout( parseInt( showClose ) ).then( function(){
          $('#block-close').css( 'visibility', 'visible' );
        });

			}

		}

		if( asyncTimeout ){
			var self = this;

			return new Promise( function( resolve, reject ){

				if( autoUnblock ){
					self.timeout( asyncTimeout ).then( function(){
						self.unblock();
						resolve();
					});
				} else {
					self.timeout( asyncTimeout ).then( resolve );
				}

			});

		} else {

			return true;
		}
	};

	/**
	 * Unblock the UI
	 */
	SUIBlocker.prototype.unblock = function() {
		this.isBlocked = false;
		this.open.set(false);
		this.message.set(false);
		if (this.templateInstance) {
			Blaze.remove(this.templateInstance);
		}
		$('html').removeClass('SUIBlocked');
		$('body').removeClass('blurring dimmed dimmable');
	};

  /**
	 * Synchronous Sleep/Timeout `await this.timeout()`
   * @param [delay=2000]			Delay in MS before returning resolved promise
   * @returns {Promise<any>}
   */
	SUIBlocker.prototype.timeout = function( delay ) {

		if( ! delay ){
			delay = 2000; // 2s timeout by default
		}

		return new Promise(function(resolve, reject) {
			setTimeout(resolve, delay);
		});
	};

	return SUIBlocker;

})();

SUIBlock = new SUIBlocker;

Template.SUIBlock.helpers({
	blocked: function() {
		return SUIBlock.open.get();
	},
	message: function() {
		return SUIBlock.message.get();
	}
});
