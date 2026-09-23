import { Link } from "react-router-dom";

type NotFoundProps = {
  title?: string;
  backTo?: string;
  backLabel?: string;
};

export default function NotFound({
  title = "Page not found",
  backTo = "/",
  backLabel = "Go to the homepage",
}: NotFoundProps) {
  return (
    <div className="page page-head">
      <h1>{title}</h1>
      <p>
        The link may be out of date. <Link to={backTo}>{backLabel}</Link>
      </p>
    </div>
  );
}
