import React, { useState, forwardRef, useImperativeHandle } from "react";
// import PropTypes from "prop-types";

// const Togglable = forwardRef((props, refs) => {
//   const [visible, setVisible] = useState(false);

//   const hideWhenVisible = { display: visible ? "none" : "" };
//   const showWhenVisible = { display: visible ? "" : "none" };

//   const toggleVisibility = () => {
//     setVisible(!visible);
//   };

//   useImperativeHandle(refs, () => {
//     return { toggleVisibility };
//   });

//   return (
//     <div>
//       <div style={hideWhenVisible}>
//         {props.buttonLable && (
//           <button onClick={toggleVisibility}>{props.buttonLable}</button>
//         )}
//       </div>
//       <div style={showWhenVisible}>
//         {props.children}
//         {props.buttonLable && (
//           <button onClick={toggleVisibility}>cancel</button>
//         )}
//       </div>
//     </div>
//   );
// });

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      {visible && <div>{props.children}</div>}
      {props.buttonLable && (
        <button onClick={toggleVisibility}>
          {visible ? "cancel" : props.buttonLable}
        </button>
      )}
    </div>
  );
});

// Togglable.propTypes = {
//   buttonLable: PropTypes.string.isRequired,
// };
Togglable.displayName = "Togglable";

export default Togglable;
