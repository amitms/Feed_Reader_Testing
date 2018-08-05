/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* loops through each feed and ensure 
         * it has a URL defined
         * and that the URL is not empty.
         */
         it('all URLs are defined', function(){
            for(let index in allFeeds){
                expect(allFeeds[index].url).toBeDefined();
                expect(allFeeds[index].url.length).not.toBe(0);
            }
         });

        /* loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('all name are defined', function(){
            for(let index in allFeeds){
                expect(allFeeds[index].name).toBeDefined();
                expect(allFeeds[index].name.length).not.toBe(0);
            }
         });

    });


    /* test suite to check the menu is hidden*/
    describe('The menu', function(){
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('menu element hidden test', function(){
            expect(document.body.classList).toContain('menu-hidden');
         });
         /* test that ensures the manu changes visibility when the menu icon is clicked. 
          * this is done with two exception with when clicked is it shown
          * hidden when clicked again.
          */
         it('menu visibility change', function(){
            $('.menu-icon-link').click();
            expect(document.body.classList).not.toContain('menu-hidden');
            $('.menu-icon-link').click();
            expect(document.body.classList).toContain('menu-hidden');
          });
    });
    /* "Initial Entries" test suite to ensure URL is loaded here loadFeed is 
     * asynchronous so jasmine done() is used
     */
    describe('Initial Entries', function(){

        /* the loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });
            
         it('loadFeed test', function(done){
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
         });

    });
    /* "New Feed Selection" test suite to  check content changes by loadfeed*/
    describe('New Feed Selection', function(){
        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         let firstFeed, secondFeed;
        beforeEach(function(done){
            loadFeed(0, function(){
                firstFeed = $('.feed').html();
                loadFeed(1, function(){
                    secondFeed = $('.feed').html();
                done();
                });
            });
        });
    
         it('loadFeed content change', function(done){
            expect(firstFeed).not.toBe(secondFeed);
            done();
         });

    });
    
}());
