type QuantityButton = {
    onClick: any;
    disabled: boolean;
    text: string;
}

const Button = (props: QuantityButton): JSX.Element => {
    return <button className="p-2 w-14 md:w-20 h-full border-none rounded-xl bg-white text-black text-center font-poppins text-2xl md:text-3xl font-semibold transition-all duration-300 ease-in-out hover:enabled:scale-110 m-3 shadow-black shadow-md" onClick={props.onClick} disabled={props.disabled}>{props.text}</button>;
};

export default Button;