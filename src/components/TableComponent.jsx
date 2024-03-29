import { Card, Typography, Chip, Tooltip } from "@material-tailwind/react";

const TABLE_HEAD = [
  "Title",
  "Description",
  "Date Added",
  "Date Modified",
  "Task Type",
  "Associated With",
  // "Action",
];

export default function TableWithStripedRows({ data }) {
  console.log(data);
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              {
                id,
                taskType,
                associateWith,
                dateAdded,
                dateModified,
                description,
                title,
                timeTaken,
              },
              index
            ) => (
              <tr key={id} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {title}
                  </Typography>
                </td>
                <td className="p-4">
                  <article
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-wrap"
                  >
                    {description.length > 50 ? (
                      <Tooltip content={description} placement="top">
                        <p>{description.substring(0, 47) + "..."}</p>
                      </Tooltip>
                    ) : (
                      description
                    )}
                  </article>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {dateAdded}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {dateModified}
                  </Typography>
                </td>
                <td className="p-4">
                  {/* <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {taskId}
                  </Typography> */}
                  <Chip
                    size="sm"
                    variant="ghost"
                    className="text-center"
                    value={taskType}
                    color={
                      taskType === "feature"
                        ? "green"
                        : taskType === "bug"
                        ? "pink"
                        : "amber"
                    }
                  />
                </td>
                <td className="p-4">
                  <Chip
                    size="sm"
                    variant="ghost"
                    className="text-center"
                    value={associateWith}
                    color={associateWith === "internal" ? "cyan" : "indigo"}
                  />
                </td>
                {/* <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium disabled"
                  >
                    Edit
                  </Typography>
                </td> */}
              </tr>
            )
          )}
        </tbody>
      </table>
    </Card>
  );
}
