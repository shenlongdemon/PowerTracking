import {View, Image, Linking, StyleSheet} from 'react-native';
import Button from 'src/shared_controls/Button';
import {IAuthService} from 'core_app/services';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
import {ROUTE} from 'src/portrait/route';
import {logo} from 'src/assets';
import {Text} from 'src/shared_controls/Text';
import {ListItem, List, Left, Icon, Body, Right, Content} from 'native-base';
import * as React from 'react';

export default class DrawerMenu extends BaseScreen<BasePops, BaseState> {
  public authService: IAuthService = FactoryInjection.get<IAuthService>(
    PUBLIC_TYPES.IAuthService,
  );
  constructor(p: BasePops) {
    super(p);
    this.logout = this.logout.bind(this);
    this.goToURL = this.goToURL.bind(this);
  }
  private logout = async (): Promise<void> => {
    const isLoggedOut: boolean = await this.authService.logOut();
    this.reset(ROUTE.AUTH);
  };

  private goToURL = async (): Promise<void> => {
    Linking.openURL('http://giamsatdulieu.com/');
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Image
          source={logo}
          style={{
            flex: 0.25,
            aspectRatio: 1,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <View style={{flex: 1}}>
          <Content>
            <List>
              <ListItem itemDivider></ListItem>
              <ListItem icon>
                <Left>
                  <Icon type="FontAwesome" active name="user-circle" />
                </Left>
                <Body>
                  <Text>Ten User</Text>
                </Body>
              </ListItem>
              <ListItem itemDivider></ListItem>
              <ListItem icon>
                <Left>
                  <Icon type="FontAwesome" active name="wifi" />
                </Left>
                <Body>
                  <Text>Smart Config</Text>
                </Body>
              </ListItem>

              <ListItem itemDivider></ListItem>
              <ListItem icon>
                <Left>
                  <Icon type="FontAwesome" active name="facebook-square" />
                </Left>
                <Body>
                  <Text>Facebook</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Text>ZALO</Text>
                </Left>
                <Body>
                  <Text>Zalo</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Icon type="FontAwesome" active name="safari" />
                </Left>
                <Body>
                  <Text>Website</Text>
                </Body>
              </ListItem>
              <ListItem itemDivider></ListItem>
              <ListItem icon>
                <Left>
                  <Icon type="FontAwesome" active name="download" />
                </Left>
                <Body>
                  <Text>Update</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Icon type="FontAwesome" active name="info" />
                </Left>
                <Body>
                  <Text>Info</Text>
                </Body>
              </ListItem>
            </List>
          </Content>
        </View>
        <Button light onPress={this.goToURL}>
          Go giamsatdulieu.com
        </Button>
        <View style={{height: 10}}></View>
        <Button danger onPress={this.logout}>
          LOG OUT
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftColumn: {
    flex: 0.4,
  },
});
