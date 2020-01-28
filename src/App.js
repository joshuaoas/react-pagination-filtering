import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from './components/Posts';
import Pagination from './components/Pagination';

import './App.css';

function App() {

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerPage] = useState(10);



  // runs when the component mounts, but also runs whenever it updates, empty array at end mimics component did mount function
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data)
      setLoading(false);
    }

    fetchPosts();
  }, []);



  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // slices out the number of posts we want, should be 10
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //change the page 
  const paginate = (pageNumber) => setCurrentpage(pageNumber);


  // filter the results
  const handleFilters = (event) => {
    let value = event.target.value;
    setSearchString(value);
    //console.log(searchString);
    setFilteredPosts(newPosts);
  };

  // filter the results
  let newPosts = posts.filter((post) => {
      // if you can't find the search query in post.title, do not return it
      return post.title.toLowerCase().indexOf(searchString.trim().toLowerCase()) !== -1;
    }
  );

  

  return (

    <div className="app">
    <div className="container pt-5">
     <h3 className="text-primary mb-3">Front-End Pagination and Filtering</h3>
     <input placeholder="Search Items..." onChange={handleFilters} className="input-text mb-3"/>

      { 
      searchString.length ? ( 
          <div className="search-text">
             {/* Searching.... */}
            <Posts posts={filteredPosts} loading={loading} />
          </div>
      ) : (
        <div>
          <Posts posts={currentPosts} loading={loading} />
          <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
        </div>
      )
      }
     

    </div>
    </div>

  );
}



export default App;
