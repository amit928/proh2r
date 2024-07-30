import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Child component
const ChildComponent = forwardRef((props, ref) => {

    const [first, setfirst] = useState(false)


    // Expose methods or properties to the parent component
    useImperativeHandle(ref, () => ({
        someMethod: () => {
            // Do something
            console.log('Some method called in ChildComponent');
            setfirst(true)
        },
        someMethod2: () => {
            // Do something
            console.log('Some method called in ChildComponent');
        },
        state: first,
        // You can expose other properties/methods as needed
    }));

    return (
        <TouchableOpacity onPress={() => ref.current.someMethod()}>
            <View>
                <Text>Child Component</Text>
            </View>
        </TouchableOpacity>
    );
});

// Parent component
const ForwardRef = () => {
    const childRef = useRef();

    const handleButtonClick = () => {
        // Accessing the exposed method in the ChildComponent
        // childRef.current.someMethod();
        console.log(childRef.current.state);
    };

    return (
        <View>
            <ChildComponent ref={childRef} />
            <TouchableOpacity onPress={handleButtonClick}>
                <View>
                    <Text>Call Child Method</Text>
                    {childRef?.current?.state &&
                        <Text>Call Child state</Text>
                    }
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ForwardRef;
