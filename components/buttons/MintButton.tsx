type MintButton = {
    text: string;
    onClick: any;
    disabled: boolean;
};

const Button = (props: MintButton): JSX.Element => {
    return (
        <button className="p-3 w-3/4  bg-white enabled:bg-opacity-90 disabled:text-red-800 enabled:border-green-700 enabled:text-green-800 disabled:border-red-700 border-2 rounded-xl font-poppins font-semibold text-3xl m-8 md:m-0 lg:text-4xl xl:text-4xl text-center shadow-black shadow-md transition-all duration-300 hover:enabled:scale-110" disabled={props.disabled} onClick={props.onClick}>
            {
                props.text
            }
        </button>
    );
};

export default Button;