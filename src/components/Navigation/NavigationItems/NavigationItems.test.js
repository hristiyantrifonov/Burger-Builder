import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// Connecting Enzyme
configure({adapter: new Adapter()});

describe('<NavigationItems>', () => {
    let wrapper;

    beforeEach(()=> {
        // Create an instance of the component standalone (possible due to Enzyme)
        wrapper = shallow(<NavigationItems/>);
    });

    // 'it' allows one test to be written
    it('should render two <NavigationItem/> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem/> elements if authenticated', () => {
        // Enzyme helper method for setting props
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should display a Logout <NavigationItem/> button if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });

});
