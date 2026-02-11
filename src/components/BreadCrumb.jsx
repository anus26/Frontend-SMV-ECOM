import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <Link to="/" className="hover:text-greenDark">
        Home
      </Link>

      {items.map((item, index) => (
        <span key={index}>
          {" / "}
          <Link
            to={`/category/${item.slug}`}
            className="hover:text-greenDark"
          >
            {item.name}
          </Link>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
