import {Body, Icon, ListItem, Right} from "native-base";
import {Text} from "src/shared_controls/Text";
import * as React from "react";

const TextListItem = ({obj, text, onPress, style}:
                          {
                              obj: any,
                              text: string,
                              onPress: ((obj: any) => void) | null | undefined,
                              style: any

                          }) => {
    const onPressed = async (): Promise<void> => {
        !!onPress && onPress(obj);
    };
    return <ListItem
        key={text}
        style={[{padding: 20, marginVertical: 8, marginHorizontal: 16}, style]}
        noIndent
        button
        onPress={onPressed}>
        <Body style={{flex: 1}}>
            <Text style={{color: 'grey'}}>{text}</Text>
        </Body>
    </ListItem>
};

export default TextListItem;