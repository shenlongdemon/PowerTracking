import {View, Image, Linking} from 'react-native';
import Button from 'src/shared_controls/Button';
import {IAuthService, User} from 'core_app/services';
import {FactoryInjection} from 'core_app/infrastructure';
import {PUBLIC_TYPES} from 'core_app/infrastructure/Identifiers';
import BaseScreen, {BasePops, BaseState} from 'src/BaseScreen';
import {ROUTE} from 'src/portrait/route';
import {Text} from 'src/shared_controls/Text';
import {ListItem, List, Left, Icon, Body, Content} from 'native-base';
import * as React from 'react';
import {ENV} from 'core_app/config';
import {RootState} from 'src/redux/rootReducer';
import {map} from 'src/middlewares/GlobalObservable';
import {AppUtil, CONSTANTS} from 'core_app/common';
import {Link} from 'src/shared_controls/Link';
import {color} from 'src/stylesheet';

interface Props extends BasePops {
  user?: User | null;
}
class DrawerMenu extends BaseScreen<Props, BaseState> {
  public authService: IAuthService = FactoryInjection.get<IAuthService>(
    PUBLIC_TYPES.IAuthService,
  );
  constructor(p: Props) {
    super(p);
    this.logout = this.logout.bind(this);
    this.goToURL = this.goToURL.bind(this);
  }
  private readonly logout = async (): Promise<void> => {
    await this.authService.logOut();
    this.reset(ROUTE.AUTH);
  };

  private readonly goToURL = async (): Promise<void> => {
    await Linking.openURL(ENV.WEB_SITE);
  };
  render() {
    if (!this.props.user) {
      return <View />;
    }
    const user: User = this.props.user!;
    const info: any = AppUtil.toJSON(user.infoapp);
    const facebook: string = info['facebook'] || CONSTANTS.STR_EMPTY;
    const zalo: string = info['zalo'] || CONSTANTS.STR_EMPTY;
    const web: string = info['web'] || CONSTANTS.STR_EMPTY;
    return (
      <View style={{flex: 1}}>
        <Image
          source={{uri: user.linklogo}}
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
              <ListItem itemDivider />
              <ListItem icon>
                <Left>
                  <Icon type="FontAwesome" active name="user-circle" />
                </Left>
                <Body>
                  <Text>{user.name}</Text>
                </Body>
              </ListItem>
              <ListItem itemDivider />
              <ListItem icon>
                <Left>
                  <Icon type="FontAwesome" active name="wifi" />
                </Left>
                <Body>
                  <Text>Smart Config</Text>
                </Body>
              </ListItem>
              <ListItem itemDivider />
              <ListItem icon>
                <Left>
                  <Icon type="FontAwesome" active name="facebook-square" />
                </Left>
                <Body>
                  <Link style={{color: color.textColor}} url={facebook}>
                    Facebook
                  </Link>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Text>ZALO</Text>
                </Left>
                <Body>
                  <Link style={{color: color.textColor}} url={zalo}>
                    Zalo
                  </Link>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Icon type="FontAwesome" active name="safari" />
                </Left>
                <Body>
                  <Link style={{color: color.textColor}} url={web}>
                    Website
                  </Link>
                </Body>
              </ListItem>
              <ListItem itemDivider />
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
          {`Designed by ${ENV.WEB_SITE}`}
        </Button>
        <View style={{height: 10}} />
        <Button danger onPress={this.logout}>
          LOG OUT
        </Button>
      </View>
    );
  }
}

export default map<Props>(DrawerMenu, (state: RootState) => ({
  user: state.auth.user,
}));
