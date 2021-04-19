import React from "react";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Table } from "react-bootstrap";
import { ThemeContext } from "../../contexts/ThemeContext";

const CustomTable = (props) => {
    // Themes
    const { isLightTheme } = useContext(ThemeContext);
    const variant = isLightTheme ? "light" : "dark";

    return (
        // <div className={"shadow rounded" + border}>
        <div className={"rounded muted_border"}>
            <Table
                hover
                striped
                responsive="sm"
                variant={variant}
                className="mb-0 rounded"
            >
                <thead>
                    <tr>
                        {props.ths.map((th) => (
                            <th
                                scope="col"
                                key={uuidv4()}
                                className={
                                    "text-center align-middle " + th.className
                                }
                            >
                                {th.value}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.datas &&
                        props.datas.map((data, index) => (
                            <tr key={uuidv4()}>
                                {props.index && (
                                    <td className="text-center align-middle">
                                        {index + 1}
                                    </td>
                                )}

                                {props.PreActionComponents &&
                                    props.PreActionComponents.map(
                                        (PreActionComponent) => (
                                            <td
                                                key={uuidv4()}
                                                className={
                                                    "text-center align-middle " +
                                                    PreActionComponent.className
                                                }
                                            >
                                                {PreActionComponent.component(
                                                    data
                                                )}
                                            </td>
                                        )
                                    )}

                                {/* Filter data[key] by the props.allowedEntry array */}
                                {props.allowedEntry
                                    ? Object.keys(
                                          Object.keys(data)
                                              .filter((key) =>
                                                  props.allowedEntry.includes(
                                                      key
                                                  )
                                              )
                                              .reduce((obj, key) => {
                                                  obj[key] = data[key];
                                                  return obj;
                                              }, {})
                                      ).map((key, i) => (
                                          <td
                                              key={uuidv4()}
                                              className={
                                                  props.tdsClassName
                                                      ? "text-center align-middle " +
                                                        props.tdsClassName[i]
                                                      : "text-center align-middle"
                                              }
                                          >
                                              {data[key] ? data[key] : "-----"}
                                          </td>
                                      ))
                                    : Object.keys(data).map((key, i) => (
                                          <td
                                              key={uuidv4()}
                                              className={
                                                  props.tdsClassName
                                                      ? "text-center align-middle " +
                                                        props.tdsClassName[i]
                                                      : "text-center align-middle"
                                              }
                                          >
                                              {data[key]}
                                          </td>
                                      ))}

                                {props.ActionComponents &&
                                    props.ActionComponents.map(
                                        (ActionComponent) => (
                                            <td
                                                key={uuidv4()}
                                                className={
                                                    "text-center align-middle " +
                                                    ActionComponent.className
                                                }
                                            >
                                                {ActionComponent.component(
                                                    data
                                                )}
                                            </td>
                                        )
                                    )}
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CustomTable;
