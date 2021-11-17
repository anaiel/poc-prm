import { useRef } from "react";
import { ToggleProps } from "@react-types/checkbox";
import { useToggleState } from "@react-stately/toggle";
import { useToggleButton } from "@react-aria/button";
import styled from "styled-components";

// Force controlled usage by making properties required
interface TogglePropsOverrides {
    children?: null;
    isSelected: boolean;
    onChange: (isSelected: boolean) => void;
}

interface AdditionalProperties {
  disabled: boolean;
}

/**
 * Accessible toggle component
 */
const Toggle = (props: ToggleProps & TogglePropsOverrides & AdditionalProperties): JSX.Element => {
    const ref = useRef();
    const state = useToggleState(props);
    const { buttonProps } = useToggleButton(props, state, ref as any);

    if (props.disabled) return <>Disabled</>;

    return (
        <Wrapper
            {...buttonProps}
            ref={ref}
            className={`toggle --${
                props.isSelected ? "selected" : "unselected"
            }`}
        >
            <div className="toggle__pin" aria-hidden="true">
            </div>
        </Wrapper>
    );
};

const togglebg = "#c3cbcd";
const togglepincolor = "white";
const selectedbgcolor = "#3885eb";

const Wrapper = styled.button`
    border: none;
    box-shadow: none;
    width: 40px;
    height: 20px;
    border-radius: 100px;
    background-color: ${togglebg};
    padding: 2px;

    .toggle__pin {
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background-color: ${togglepincolor};
        position: relative;
        transition: left 0.5s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;

        .material-icons {
            font-size: 12px;
        }
    }

    &.--selected {
        background-color: ${selectedbgcolor};

        .toggle__pin {
            left: 20px;
        }
    }
    &.--unselected .toggle__pin {
        left: 0;
    }
`


export default Toggle;

