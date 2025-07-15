### Sykell WebCrawler Frontend

This is a project that crawls a user given URLs for general page information such as 
* HTML version
* Page title
* Count of heading tags by level (H1, H2, etc.)
* Number of internal vs. external links
* Number of inaccessible links (those returning 4xx or 5xx status codes)
* Presence of a login form

### Installation Instructions

Clone project
`git clone https://github.com/LuminousIT/Sykell-Webcrawler.git`

Change Directory to Project Directory
`cd Sykell-Webcrawler`

Install dependencies
`npm run dev`

Then `npm run start`

#### Backend Info
The [Backend repository](https://github.com/LuminousIT/Sykell-Backend) of this project can be cloned at => https://github.com/LuminousIT/Sykell-Backend 

#### Basic Features
1. **Authentication**
     *  Register as a user
     *  Signin as a user
  
2. **URL Management**

    * Add URLs for analysis
    * Start/stop processing on selected URLs

3. **Results Dashboard**

    * Paginated, sortable table (columns: Title, HTML Version, #Internal Links, etc.)
    * Column filters and a global search box (fuzzy or prefix matching)

4. **Details View**

    * Click a row to open a detail page showing:

        * Bar or donut chart of internal vs. external links
        * List of broken links with status codes

5. **Bulk Actions**

    * Re-run analysis or delete selected URLs via checkboxes

6. **Real-Time Progress**

    * Display crawl status for each URL (queued → running → done / error)
