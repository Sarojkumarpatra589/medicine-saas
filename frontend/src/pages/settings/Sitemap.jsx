import React from "react";

const Sitemap = () => {
  const [sitemaps] = React.useState([
    {
      id: 1,
      url: "https://localhost/Preclinic",
      filename: "sitemap18725604.xml",
    },
  ]);

  return (
    <div className="p-4 bg-white">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Sitemap</h5>

        <button
          className="btn btn-sm"
          style={{ backgroundColor: "#2f3dbd", color: "#fff" }}
        >
          + Generate Sitemap
        </button>
      </div>

      <hr />

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="bg-light">
            <tr>
              <th>URL</th>
              <th>Filename</th>
            </tr>
          </thead>

          <tbody>
            {sitemaps.map((item) => (
              <tr key={item.id}>
                <td>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.url}
                  </a>
                </td>

                <td>
                  <a
                    href={`${item.url}/${item.filename}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary fw-semibold"
                  >
                    {item.filename}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sitemap;
