
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser, getComments, getAllUser, getPosts } from './services.js';
import './css/style.css';
import './css/reset.css';
import './css/header.css';
import './css/postDetail.css';
import iconArrow from './arrow.svg';
import InfiniteScroll from "react-infinite-scroll-component";

 /* 
  * Em mới học hơi gấp, mấy anh chị chịu khó đọc nhe <3
  */

function App() {
  const [posts, setPosts] = useState();
  const [homePage, setHomePage] = useState(true);
  const [detailPage, setDetailPage] = useState(false);
  const [detailPost, setDetailPost] = useState();
  const [user, setUser] = useState();
  const [comments, setComments] = useState();
  const [input, setInput] = useState();
  const [tmpPost, setTmpPost] = useState();
  const [errorPage, setErrorPage] = useState(false);
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    getPosts()
        .then(res => {
          const post = res.data;
          setPosts(post);
          setTmpPost(post);
        })

        .catch(error => console.log(error));

    getAllUser()
        .then(res => {
          setAllUser(res.data)
        })
        
        .catch(error => console.log(error));
  }, []);

  const toDetail = (post) => {
    setDetailPost(post);
    setDetailPage(true);
    setHomePage(false);
    getUser(post.userId).then(res => {
      console.log(res)
      setUser(res.data[0]);
    })
    getCmt(post.id)
  }

  const toPostsList = () => {
    setDetailPage(false);
    setHomePage(true);
    setDetailPost();
    setComments();
    setUser();
  }

  const getCmt = (id) => {
    getComments(id)
      .then(res => {
        setComments(res.data)
      })
      .catch(error => console.log(error))
  }

  const searchOnChange = (e) =>{
    const searchPosts = [...posts]
    const res = searchPosts.filter((item) => item.title.toLowerCase().includes(e.toLowerCase()))
    if(res.length >0){
      
      if (errorPage)
        setErrorPage(false)
      setPosts(res)
    }else{
      setErrorPage(true);
    }  

    if(!e){
      if (errorPage)
        setErrorPage(false)
      setPosts(tmpPost)
    }
  }

  const searchTool= ()=>{
    const searchPosts = [...posts]
    const res = searchPosts.filter((item) => item.title.toLowerCase().includes(input.toLowerCase()))
    if(res.length >0){
      
      if (errorPage)
        setErrorPage(false)
      setPosts(res)
    }else{
      setErrorPage(true);
    }  

    if(!input){
      if (errorPage)
        setErrorPage(false)
      setPosts(tmpPost)
    }
  }

  

  var postList = posts?.map((post, index) => {
    return <div className="container__postcard" key={post.id} >
              <div className="postcard__title">
                <h3>{post.title}</h3>
              </div>
              <div className="postcard__author">
                Author: {
                  allUser[post.userId-1]?.name
                  
                }
              </div>
              <div className="postcard__date">
                Created at: Dec 18, 1999
            </div>
            <div className="postcard__content">
                {post.body}
            </div>
            <div className="detail__post">
              <a  onClick={() => toDetail(post)} key={index}> For detail </a>
            </div>
          </div>
      
    
    
    
    
  })

  var cmt = comments?.map((comment, index) => {
    return <div className="comments">
      <div className="comment__ava">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
      </div>
      <div className="comment__block">
        <div className="comment__username">{comment.name}</div>
        <span className="comment__time">a day ago</span>
        <div className="comment__content">
          {comment.body}
        </div>
        <span className="comment__reply">Reply to</span>
      </div>
    </div>
  })




  return (
    <div id="app">
      <header id="header">
        <div id="header__logo">
          <span onClick={() => toPostsList()} className="logo__img">{detailPage ? <img style={{width:'25px'}} src={iconArrow} alt="" /> : ''}</span>
          <span className="header__text">Logo</span>
        </div>
        <div id="header__brand">
          <span className="header__text">Blogs</span>
        </div>
        <div id="header__account">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <span className="header__text">Adam Levine</span>
          </div>
        </div>
      </header>
            


      {homePage &&
        <>
          <div>
            <div className="search__tool">
              <input placeholder="enter title here" onChange={(e) => {setInput(e.target.value); searchOnChange(e.target.value)}}></input>
              <span onClick={() => searchTool()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </span> 
            </div>

            <div id="container">
              {errorPage===false&&
                <>
                  {postList}
                </>
              }

              {errorPage &&
                <>
                  <h1 style={{textAlign: 'center', fontSize: '36px', padding: '24px'}}>
                    Input not found
                  </h1>
                </>
              }
            </div>
          </div>
        </>
      }



      {detailPage &&
        <>
          <div id="container">
            <div className="container__postcard">
              <div className="postcard__title">
                <h3>{detailPost.title}</h3>
              </div>
              <div className="postcard__author">
                Author:
                {
                  (allUser[detailPost.userId - 1]?.name) 
                }

              </div>
              <div className="postcard__date">
                Created at: Dec 18, 1999
            </div>
            <div className="postcard__content">
                {detailPost.body}
              </div>
              <div className="postcard__comment">
                <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                  {comments?.length} replies
                </a>
              <hr></hr>

                <div className="comment__container collapse" id="collapseExample">
                  {
                    cmt
                  }
                </div>
              </div>
            </div>
          </div>
        </>
      }
      
    </div>
  )
}
export default App;
