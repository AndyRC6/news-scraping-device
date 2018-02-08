# news-scraping-device
Device that scrapes for news

This web application scrapes news articles featured on the home page of MensHealth.com and adds them to a Mongo Database. All articles
that are scraped will be displayed on the home page where users can post comments on each article.

This application features a home brewed user authentication system - an account must be created in order to see the home page and comment
on articles. All passwords are hashed and sessions are managed directly in the mongo database.

There is a button on the home page to scrape the latest articles from MensHealth, however it will not scrape articles that have already
been scraped and stored. So if you click the button and nothing happens, it's likely that there are no new articles to scrape and 
everything is up to date.

You may need to refresh the page after scraping to see the new articles.

The UI is ugly, as but the focus of this application was on the back end..
