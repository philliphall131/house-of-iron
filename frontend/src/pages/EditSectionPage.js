import { EditorContainer } from "../components/components"
import { Form, Table } from "react-bootstrap"
import { useEffect, useState } from "react";


const EditSectionPage = () => {
  const [desc, setDesc] = useState("");

  return (
    <div>
      {/* <EditorHeader title={'Section'}/> */}
      <div className="program-body mt-0 pt-0">
        <div className="schedule-body mt-0 pt-0">
          <div className="schedule-title text-center my-0">Section Editor</div>
          <div className="section-editor-body">
            <div className="section-description">
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description of Exercises</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </div>
            <div className="section-exercise">
              <h5>1. Back Squat</h5>
              <div className="exercise-table-container">
                <table bordered className="exercise-table">
                  <thead>
                    <tr>
                      <th className="set-col">Set</th>
                      <th className="data-col">Reps</th>
                      <th className="data-col">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>10</td>
                      <td>135</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>10</td>
                      <td>155</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>10</td>
                      <td>225</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="exercise-table-container">
                <Table bordered className="exercise-table">
                  <thead>
                    <tr>
                      <th className="set-col">Set</th>
                      <th className="data-col">Reps</th>
                      <th className="data-col">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>10</td>
                      <td>135</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>10</td>
                      <td>155</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>10</td>
                      <td>225</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditSectionPage