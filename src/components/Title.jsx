function Title(props) {
  return (
    <h1 className=" text-4xl mt-8 text-center text-slate-100 font-bold">
      {props.children}
    </h1>
  );
}

export default Title;
