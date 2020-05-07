import React from 'react';
import { Grid, List } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { background: '#1B1C1D', paddingTop: '15px' };
    return (
        <div className="Nunito-font font-color-white" style={divStyle}>
          <footer>
            <Grid textAlign='center' container>
              <Grid.Column width={3}>
                <List className="font-color-green font-bold font-small"> Social Media </List>
                <hr/>
                <List.Item className="font-color-white" href={'https://www.facebook.com/'}>
                  Facebook
                </List.Item> <br />
                <List.Item className="font-color-white" href={'https://www.instagram.com/'}>
                  Instagram
                </List.Item> <br />
                <List.Item className="font-color-white" href={'https://twitter.com/'}>
                  Twitter
                </List.Item> <br />
              </Grid.Column>
              <Grid.Column width={3}>
                <List className="font-color-green font-bold font-small">Useful Links</List>
                <hr/>
                <List.Item className="font-color-white" href={'https://www.khanacademy.org/'}>
                  Khan Academy
                </List.Item> <br />
                <List.Item className="font-color-white" href={'https://www.chegg.com/study'}>
                  Chegg
                </List.Item> <br />
                <List.Item className="font-color-white" href={'https://stackoverflow.com/'}>
                  Stack Overflow
                </List.Item> <br />
              </Grid.Column>
              <Grid.Column width={3}>
                <List className="font-color-green font-bold font-small">Support Us</List>
                <hr/>
                <List.Item className="font-color-white" href={'https://www.paypal.com/us/home'}>
                  PayPal
                </List.Item> <br />
                <List.Item className="font-color-white" href={'https://www.gofundme.com/'}>
                  GoFund Me
                </List.Item> <br />
                <List.Item className="font-color-white" href={'https://www.twitch.tv/aesplozion'}>
                  Twitch - aesplozion
                </List.Item> <br />
                <List.Item className="font-color-white" href={'https://www.twitch.tv/potatonii'}>
                  Twitch - potatonii
                </List.Item> <br />
              </Grid.Column>
              <Grid.Column width={3}>
                <List className="font-color-green font-bold font-small">About Us</List>
                <hr/>
                <List.Item>
                  PHQSHTP inc. llc. co. LtD. est 2018 <br />
                  University of Hawaii<br />
                  Honolulu, HI 96822
                </List.Item>
              </Grid.Column>
            </Grid>
          </footer>
        </div>
    );
  }
}

export default Footer;
