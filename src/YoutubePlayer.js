import React, {Component} from 'react';
import { Form, Container, Grid, Divider } from 'semantic-ui-react';
import Suggestion from './Suggestion'


class YoutubePlayer extends Component{
  constructor(){
    super()
    this.state = {
      query: 'speed',
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=AIzaSyCYchlTicuWz3_usJZyluJKkW0S6OAoh7E&q=`,
      firstVideoId: '',
      suggestedVideos: []
    }
    this.getVideos = this.getVideos.bind(this);
    this.searchVideos = this.searchVideos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeVideo = this.changeVideo.bind(this);
  }

  componentDidMount(){
   this.getVideos(this.state.query)
  }

  getVideos(searchQuery){
    let url =  this.state.url + searchQuery;
    return (
      fetch(url).then(response => response.json())
      .then((data) => {
        let firstVideo = data.items.shift();
        this.setState({...this.state, firstVideoId: firstVideo.id.videoId, suggestedVideos: data.items});
      })
    )
  }

  handleChange(e){
    this.setState({...this.state, query: e.target.value});
  }

  searchVideos(e){
    e.preventDefault();
    console.log(e.target)
    this.getVideos(this.state.query)
  }

  changeVideo(video){
    this.setState({...this.state, firstVideoId: video.id.videoId})
  }

  render() {
    return(
      <div>
        <Container textAlign='center'>
          <Divider />
          <Form onSubmit={this.searchVideos} size='small'>
            <Form.Group>
              <Form.Input placeholder={this.state.query} width={6} onChange={this.handleChange} />
              <Form.Button content='Get Videos' />
            </Form.Group>
          </Form>

          <div className='embed-responsive embed-responsive-21by9'>
            <iframe className='embed-responsive-item' src={'https://www.youtube.com/embed/' + this.state.firstVideoId} allowFullScreen title='youtube player' />
          </div>

          <Divider horizontal>
            suggestion
          </Divider>

          <Grid doubling columns={3}>
            {
              this.state.suggestedVideos.map((video) => <Suggestion video={video} changeVideo={this.changeVideo} />)
            }
          </Grid>
        </Container>
      </div>
    )
  }
}

export default YoutubePlayer;