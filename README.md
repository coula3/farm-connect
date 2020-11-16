farmConnect is an app that seeks to increase access to markets for farmers in least developed economies and hopefully result in better economic and social outcomes.

An account can be created in the application as a farmer or prospect.

Once a farmer has an account set up, listings of farm produce can be created that provides data points on listing date, commodity, farmer, estimated availability, quantity, unit of measure and supplementary information. 

A prospect will be able to view all open listings and be able to indicate interest for any specific listing that will hopefully kickstart communication with the farmer owner of the listing which may result in a mutually benefitting exchange.

ARCHITECTURE AND MODELS
 
The app has a backend API powered by Ruby on Rails and a frontend built with HTML, CSS, React and React-Redux. The app features 7 models - Farmer, Prospect, User (STI), Listing, Commodity, Connection, Interest. 

GETTING STARTED
Fork and clone the app from Github repo git@github.com:coula3/farm-connect
cd “farmer-connect/farm-connect-backend”’
Run “gem install bundler”
Run “rails db:create && rails db:migrate”
Run “rails db:seed”
Add JWT secret to ApplicationController
Start the Rails Server: run “rails s”
cd “farmer-connect/farm-connect”
Run “npm install”
Launch the application: “npm start”