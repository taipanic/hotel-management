import React from "react";

const logProps = (WrappedComponent) => (props) => {
  React.useEffect(() => {
    console.log("New props:", props);
    return () => {
      console.log("Old props:", props);
    };
  });

  return <WrappedComponent {...props} />;
};

const usePropsLogger = (component) =>
  React.useMemo(() => logProps(component), [component]);

function PropsLogger({ component: Component, ...props }) {
  const a = [...Object.keys(props).map((key) => props[key])];
  console.log(a);

  React.useEffect(() => {
    console.log("New props:", props);
    return () => {
      console.log("Old props:", props);
    };
  });
  return <Component {...props} />;
}

function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export { PropsLogger, usePropsLogger, useInterval };
