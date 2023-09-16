import React, { Component } from 'react'
import NewsItem from './NewsItem'
let defaultImage ='https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202309/ufo-image-nasa-155143918-16x9.jpg?VersionId=RCJwBTH93OauJFzgZf9QemLMZhkNsqkH'
export  class News extends Component {

  constructor(){
    super()
    this.state={
      articles:[] ,
      loading: false
    }

  }
  async componentDidMount(){
    let url = 'https://newsapi.org/v2/top-headlines?country=IN&apiKey=8e6be48dd1384026baf1d0d130093c82'
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({articles: parsedData.articles})
  }
  render() {
    return (
      <div className='container my-3' >
        <h1 className='container text-center'>News monkey- top headlines</h1>
        <div className='row'>
          {this.state.articles.map((element)=>{
          return <div className='col-md-4' key={element.url}>
          <NewsItem title={element.title} description={element.description} newsUrl={element.newsUrl} imageUrl={element.urlToImage?element.urlToImage:defaultImage}/>
          </div>
          }
          )}
        </div>
        
      </div>
    )
  }
}

export default News

