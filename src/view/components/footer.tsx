import {Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import {Divider, Menu} from 'react-native-paper';
import {RootStackParamList} from '../../../App';
import {getRootNavigation} from "../../service/navigation";
import {useNavigationStateExternal} from "../../hooks/use-navigation-state-external";
import {MyText} from "./my-text";
import {ITheme, makeVariants, useTheme} from "../../theming";


export default function Footer() {
    const styles = useTheme(variants);
    const [menu, setMenu] = useState(false);
    const navigationState = useNavigationStateExternal();
    const activeRoute = navigationState?.routes[0];

    const nav = async (route: keyof RootStackParamList) => {
        const navigation = getRootNavigation();
        navigation.reset({
            index: 0,
            routes: [{name: route}]
        });
    };

    const iconStyle = (...routes: string[]) => {
        // console.log('currentRoute', activeRoute?.name);
        const isActiveRoute = routes.includes(activeRoute?.name);
        return isActiveRoute ? styles.iconActive : styles.icon;
    };

    const iconPopupStyle = (...routes: string[]) => {
        const isActiveRoute = routes.includes(activeRoute?.name);
        return isActiveRoute ? styles.iconActive : styles.iconInPopup;
    };

    // setTimeout(() => setMenu(true), 100);

    const iconSize = 22;

    const useIcon = (name: string, page?: string) => (props: any) => <Icon5 name={name} {...props} style={[styles.menuIcon, iconPopupStyle(page || '')]} size={iconSize} solid />;

    return (
            <View style={styles.container}>
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuButton} onPress={() => nav('Search')}>
                        <Icon name="search" size={iconSize} style={iconStyle('Search')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => nav('Feed')}>
                        <Icon name="heart" size={iconSize} style={iconStyle('Feed')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => nav('Main')}>
                        <Icon name="user" size={iconSize} style={iconStyle('Main')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => nav('Leaderboard')}>
                        <Icon name="trophy" size={iconSize} style={iconStyle('Leaderboard')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => nav('Civ')}>
                        <Icon5 name="landmark" size={iconSize} style={iconStyle('Civ')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton} onPress={() => nav('Guide')}>
                        <Icon name="graduation-cap" size={iconSize} style={iconStyle('Guide')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButtonDots} onPress={() => setMenu(true)}>
                        <Icon name="ellipsis-v" size={iconSize} style={iconStyle('Tech', 'Unit', 'Building', 'About', 'Settings', 'Changelog')} />
                    </TouchableOpacity>
                   <Menu
                        contentStyle={{marginBottom: 50}}
                            visible={menu}
                            onDismiss={() => setMenu(false)}
                            anchor={
                                <View><MyText> </MyText></View>
                            }
                   >
                        <Menu.Item icon={useIcon('hands-helping')} titleStyle={iconPopupStyle('')} onPress={() => { Linking.openURL('https://discord.com/invite/gCunWKx'); setMenu(false); }} title="Help" />
                        <Menu.Item icon={useIcon('coffee')} titleStyle={iconPopupStyle('')} onPress={() => { Linking.openURL('https://www.buymeacoffee.com/denniskeil'); setMenu(false); }} title="Buy me a coffee" />
                        <Divider />
                        <Menu.Item icon={useIcon('question-circle', 'About')} titleStyle={iconPopupStyle('About')} onPress={() => { nav('About'); setMenu(false); }} title="About" />
                        <Menu.Item icon={useIcon('exchange-alt', 'Changelog')} titleStyle={iconPopupStyle('Changelog')} onPress={() => { nav('Changelog'); setMenu(false); }} title="Changelog" />
                        <Divider />
                        <Menu.Item icon={useIcon('cog', 'Settings')} titleStyle={iconPopupStyle('Settings')} onPress={() => { nav('Settings'); setMenu(false); }} title="Settings" />
                        <Divider />
                        <Menu.Item icon={useIcon('archway', 'Building')} titleStyle={iconPopupStyle('Building')} onPress={() => { nav('Building'); setMenu(false); }} title="Buildings" />
                        <Menu.Item icon={useIcon('flask', 'Tech')} titleStyle={iconPopupStyle('Tech')} onPress={() => { nav('Tech'); setMenu(false); }} title="Techs" />
                        <Menu.Item icon={useIcon('fist-raised', 'Unit')} titleStyle={iconPopupStyle('Unit')} onPress={() => { nav('Unit'); setMenu(false); }} title="Units" />
                    </Menu>
                </View>
            </View>
    );
}

const getStyles = (theme: ITheme) =>
    StyleSheet.create({
        menu: {
            // backgroundColor: 'yellow',
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-evenly',
            flex: 1,
        },
        menuIcon: {
            alignSelf: 'center'
        },
        iconInPopup: {
            color: theme.textNoteColor,
        },
        icon: {
            color: '#777',
        },
        iconActive: {
            color: theme.textColor,
            fontWeight: 'bold',
        },
        menuButton: {
            // backgroundColor: 'blue',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            marginHorizontal: 2,
        },
        menuButtonDots: {
            // backgroundColor: 'blue',
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
            marginHorizontal: 2,
        },
        header: {
            // backgroundColor: 'blue',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
        },
        container: {
            // backgroundColor: 'blue',
            borderTopWidth: 1,
            borderTopColor: theme.borderColor,
            flexDirection: 'row',
            height: 48,
            paddingLeft: 16,
            paddingRight: 12, // because of three dots icon
        },
    });

const variants = makeVariants(getStyles);
