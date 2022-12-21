import clsx from "clsx";
import styles from "./TemplateName.module.css";
import { TemplateNameProps } from "./TemplateName.props";

export const TemplateName = ({}: TemplateNameProps) => {
  return <div className={clsx(styles.templateName, {})}></div>;
};
