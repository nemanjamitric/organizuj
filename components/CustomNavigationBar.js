import {Appbar} from "react-native-paper";

const CustomNavigationBar = ({options}) => {
    return(
        <Appbar.Header>
            <Appbar.Content title={options.title} />
        </Appbar.Header>
    )
}

export default CustomNavigationBar;