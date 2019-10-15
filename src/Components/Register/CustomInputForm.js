import * as React from 'react';
import PropTypes from 'prop-types';

import {colors} from '../../config/colors';
import {Input} from 'react-native-elements';

class CustomInputForm extends React.Component {
    render() {
        const {
            maxLength,
            returnKeyType,
            keyboardType,
            placeholder,
            autoFocus,
            onSubmitEditing,
            onChangeText,
            name,
            setRef,
            secureTextEntry,
        } = this.props;

        return (
            <Input {...this.props}
                   ref={(ref) => this.props.setRef(ref, this.props.name)}
                   blurOnSubmit={false}
            />
        );
    }
}

CustomInputForm.propTypes = {
    name: PropTypes.string,
    maxLength: PropTypes.number,
    returnKeyType: PropTypes.string,
    keyboardType: PropTypes.string,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    onSubmitEditing: PropTypes.func,
    onChangeText: PropTypes.func.isRequired,
    setRef: PropTypes.func,
    secureTextEntry: PropTypes.bool,
};

CustomInputForm.defaultProps = {
    autoCapitalize: 'none',
    autoFocus: false,
    keyboardType: 'default',
};

export default CustomInputForm;
