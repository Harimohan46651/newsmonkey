import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
let defaultImage ='https://akm-img-a-in.tosshub.com/indiatoday/images/media_bank/202309/ufo-image-nasa-155143918-16x9.jpg?VersionId=RCJwBTH93OauJFzgZf9QemLMZhkNsqkH'
export  class News extends Component {

  static defaultProps={
    PageSize: 6,
    country:'in',
    category:'general'
  }
  static propTypes ={
    pageSize:PropTypes.number,
    country: PropTypes.string,
    category:PropTypes.string
   }
  constructor(){
    super()
    this.state={
      articles:[] ,
      loading: true,
      page:1,
      totalResults:0
    }

  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url)
    let parsedData = await data.json()
    // console.log(parsedData)
    this.setState({articles: parsedData.articles,
    totalResults:parsedData.totalResults,
    loading:false
    })
  }
  // handlePrevClick= async()=>{
  //   if(this.state.page>1){
  //     let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
  //     this.setState({loading:true})
  //     let data = await fetch(url)
  //     let parsedData = await data.json()
  //     console.log(parsedData)
  //     this.setState({articles: parsedData.articles,
  //       page:this.state.page-1,
  //       loading: false
  //     })
  //   }
    
    
  // }
  // handleNextClick = async()=>{
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //     let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //     this.setState({loading: true});
  //     let data = await fetch(url);
  //     let parsedData = await data.json() 
  //     this.setState({
  //         page: this.state.page + 1,
  //         articles: parsedData.articles,
  //         loading: false
  //     })
  //   }

  // }
  fetchMoreData = async () => {  
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d093053d72bc40248998159804e0e67d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
    })
  };

  render() {
    return (
      <>
        <h1 className='container text-center'>News monkey- top headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage?element.urlToImage:defaultImage } newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
    </>
    )
  }
}

export default News
