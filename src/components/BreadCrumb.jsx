import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="text-sm text-gray-600 mb-4 flex flex-wrap gap-1">
      <Link to="/" className="hover:text-greenDark">
        Home
      </Link>

      {items.map((item, index) => {
        // Decide URL: product or category
        const url = item.type === "category" ? `/category/${item.slug}` : `/product/${item.slug}`;

        return (
          <span key={index} className="flex items-center">
            <span className="mx-1">/</span>
            <Link to={url} className="hover:text-greenDark">
              {item.name}
            </Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
