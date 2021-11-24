<p align="center">
  <img src="https://crewmeister.com/images/logo_crewmeister_without_text.svg" />
</p>

# 🚀 Crewmeister coding challenge - Frontend (React)


## Context

The answer to the coding challenged is divided into 2 parts
  
  1. Absence server - Backend serves the api to get the absence and members data 
  
  2. Absence viewer - Front end to view the absence data

## Absense server

Implements http get request for 

  1. Absence Data

    - /absence?pagenumber=<pagenumber>  
    
    Returns
    
    payload:[{}] array of max 10 elements.
    pagenumber: current pagenumber
    totalpages: total number of pages 
    
    by default pagenumber = 1 so /absence and /absence?pagenumber=1 return the same resutls

  2. Members Data 
  
    - /members 
    
      Returns 
      
      [{}] array of details of all the members 
  
    - /members/<id> 
    
      Returns 
      
      [{}] with the matching member or empty array

### To Start
  1. cd to folder absence-server
  2. in the terminal execute "npm install" to get the dependencies
  3. in the terminal execute "npm run start" to start the server. Server runs in port 5000 

## Absence viewer

  The react front end to display the absence data

  The following functionality is available.
  1. Display 10 rows at a page with pagination. Pagination calls the server to return the next set of data
  2. Filter upon status, start date and end date the current page. Changing the pages resets the filters
  3. Date Filter works as follows. Only start date or end date is input in the filter, then data is filtered having the same start date or end date. If both start date and end date is input in the filter, then the data is filtered with the dates 
between the start and end date
  4. Shows loading state, when data is loading
  5. Shows error state, when error occurs during loading

The absence viewer makes use of the react table library. https://github.com/tannerlinsley/react-table


  ### To Start
  1. cd to folder absence-viewer
  2. in the terminal execute "npm install" to get the dependencies
  3. in the terminal execute "npm run start" to start
  4. in browser open http://localhost:3000 or url as mentioned in the terminal after step 3 