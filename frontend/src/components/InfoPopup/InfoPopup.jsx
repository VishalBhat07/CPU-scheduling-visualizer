import React, { useEffect, useState } from "react";
import "./InfoPopup.css";
import Accordion from "../Accordion/Accordion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function InfoPopup({ algorithmName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetch(`/algorithmInfo/${algorithmName}.json`)
        .then((res) => res.json())
        .then((data) => setInfo(data))
        .catch((err) => console.error("Error fetching info:", err));
    }
  }, [isOpen, algorithmName]);

  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <>
      <button className="info-btn" onClick={togglePopup}>
        Info
      </button>

      {isOpen && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={togglePopup}>
              &times;
            </button>

            {info ? (
              <div className="popup-content">
                <h2>{info.algorithmName}</h2>

                <section>
                  <h3>Definition</h3>
                  <p>{info.definition}</p>
                </section>

                <section>
                  <h3>Working</h3>
                  <p>{info.working.description}</p>

                  {info.working.example?.processTable && (
                    <>
                      <h4>Example Process Table</h4>
                      <table>
                        <thead>
                          <tr>
                            {info.working.example.processTable.headers.map(
                              (header, idx) => (
                                <th key={idx}>{header}</th>
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {info.working.example.processTable.rows.map(
                            (row, i) => (
                              <tr key={i}>
                                {row.map((cell, j) => (
                                  <td key={j}>{cell}</td>
                                ))}
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  )}

                  {info.working.example?.ganttChartImage && (
                    <img
                      src={info.working.example.ganttChartImage}
                      alt="Gantt Chart"
                      className="popup-image"
                    />
                  )}

                  {info.working.example?.queueDiagramImage && (
                    <img
                      src={info.working.example.queueDiagramImage}
                      alt="Queue Diagram"
                      className="popup-image"
                    />
                  )}
                </section>

                {info.characteristics && (
                  <section>
                    <h3>Characteristics</h3>
                    <table>
                      <tbody>
                        {info.characteristics.map((item, idx) => (
                          <tr key={idx}>
                            <td>
                              <strong>{item.feature}</strong>
                            </td>
                            <td>{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                )}

                {info.performanceIssues && (
                  <section>
                    <h3>Performance Issues</h3>
                    <p>
                      <strong>{info.performanceIssues.title}:</strong>{" "}
                      {info.performanceIssues.description}
                    </p>
                  </section>
                )}

                {info.daaStrategy && (
                  <section>
                    <h3>DAA Strategy</h3>
                    <p>
                      <strong>Type:</strong> {info.daaStrategy.type}
                    </p>
                    <p>
                      <strong>Justification:</strong>{" "}
                      {info.daaStrategy.justification}
                    </p>
                  </section>
                )}

                {info.dataStructures && (
                  <section>
                    <h3>Data Structures</h3>
                    <p>
                      <strong>Used:</strong>{" "}
                      {info.dataStructures.used.join(", ")}
                    </p>
                    <p>
                      <strong>Justification:</strong>{" "}
                      {info.dataStructures.justification}
                    </p>
                  </section>
                )}

                {info.efficiencyAnalysis && (
                  <section>
                    <h3>Complexity</h3>
                    <p>
                      <strong>Time:</strong>{" "}
                      {info.efficiencyAnalysis.timeComplexity.notation} —{" "}
                      {info.efficiencyAnalysis.timeComplexity.reasoning}
                    </p>
                    <p>
                      <strong>Space:</strong>{" "}
                      {info.efficiencyAnalysis.spaceComplexity.notation} —{" "}
                      {info.efficiencyAnalysis.spaceComplexity.reasoning}
                    </p>
                  </section>
                )}

                {info.performanceGraph && (
                  <section>
                    <h3>Performance Graph</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart
                        data={info.performanceGraph}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="numProcesses"
                          label={{
                            value: "Number of Processes",
                            position: "insideBottom",
                            offset: -5
                          }}
                        />
                        <YAxis
                          label={{
                            value: "Time (ms)",
                            angle: -90,
                            position: "insideLeft"
                          }}
                        />
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                        <Line
                          type="monotone"
                          dataKey="averageWaitingTime"
                          stroke="#8884d8"
                          name="Avg Waiting Time"
                        />
                        <Line
                          type="monotone"
                          dataKey="averageCompletionTime"
                          stroke="#82ca9d"
                          name="Avg Completion Time"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </section>
                )}

                {info.graphAnalysis && (
                  <section>
                    <h3>Graph Analysis</h3>
                    <p><strong>Observation:</strong> {info.graphAnalysis.observation}</p>
                    <p><strong>Reason:</strong> {info.graphAnalysis.reason}</p>
                  </section>
                )}

                {info.advantages && (
                  <section>
                    <h3>Advantages</h3>
                    <ul>
                      {info.advantages.map((adv, idx) => (
                        <li key={idx}>{adv}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {info.disadvantages && (
                  <section>
                    <h3>Disadvantages</h3>
                    <ul>
                      {info.disadvantages.map((disadv, idx) => (
                        <li key={idx}>{disadv}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {info.faq && (
                  <section>
                    <h3>FAQs</h3>
                    <Accordion items={info.faq} />
                  </section>
                )}

                {info.resources && (
                  <section>
                    <h3>Resources</h3>
                    <ul>
                      {info.resources.map((res, idx) => (
                        <li key={idx}>
                          <a href={res.url} target="_blank" rel="noreferrer">
                            {res.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            ) : (
              <p>Loading info...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default InfoPopup;
