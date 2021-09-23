import React, {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useRef,
  useState
} from "react";
import { AccordionWrapper } from "./AccordionStyle";

export interface AccordionProps {
  expanded?: boolean;
  children: ReactElement[] | any;
  pl?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  expanded = true,
  pl,
  children,
}) => {
  const [open, setOpen] = useState(expanded);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [parentHeight, setParentHeight] = useState("fit-content");

  const ref = useRef(null);

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let parent = ref.current;

    if (parent) {
      setHeaderHeight(parent.children[0].scrollHeight);
      setParentHeight(parent.scrollHeight);
    }
  }, [ref.current]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setParentHeight("fit-content")
  //   }, 300);
  // }, [parentHeight])

  var modifiedChildren = Children.map(children, (child, ind) => {
    if (ind === 0) return cloneElement(child, { open, onClick: toggle });
    else return child;
  });
  useEffect(() => {
    setTimeout(() => {
      setOpen(false)
    }, 500);
  }, [])


  return (
    <AccordionWrapper ref={ref} height={open ? parentHeight : headerHeight} pl={pl}>
      {modifiedChildren}
    </AccordionWrapper>
  );
};

Accordion.defaultProps = {
  expanded: false,
};

export default Accordion;
