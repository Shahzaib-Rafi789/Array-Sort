# Web Workers Performance Comparison

## Description:
This project is a web application designed to compare the performance of data processing using Web Workers versus traditional single-threaded JavaScript. The application sorts large arrays of randomly generated numbers, allowing users to input the size of the array and the number of worker threads to utilize for the processing.

## How to Run the Project Locally:
To run the project locally, follow these steps:
1. Clone this repository to your local machine.
2. Ensure you have a modern web browser installed (e.g., Google Chrome, Mozilla Firefox).
3. Open the `index.html` file in your preferred browser.

## Performance Findings:
Using Web Workers for data processing provides significant performance improvements, especially when dealing with large datasets. By offloading processing tasks to separate worker threads, the main UI thread remains responsive, resulting in a smoother user experience.

## Challenges Faced and Solutions:
### Challenge 1: Cross-Origin Security Restrictions
When trying to create Web Workers using local file paths (`file://` protocol), security restrictions prevented the workers from loading.
#### Solution:
Setting up a local server using Python's built-in HTTP server (`python -m http.server`) allowed us to serve the files over HTTP, overcoming the cross-origin restrictions.
