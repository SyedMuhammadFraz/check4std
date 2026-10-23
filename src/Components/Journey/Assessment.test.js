import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Assessment from "../Questionares/StdQuestions";
import { AuthContext } from "../../utils/AuthContext";
import { webApiInstance } from "../../AxiosInstance";
jest.mock("../../AxiosInstance", () => ({ webApiInstance: { get: jest.fn(), post: jest.fn() } }));
jest.mock("../../utils/AuthContext", () => ({ AuthContext: require("react").createContext({}) }));
jest.mock("../../utils/QuestionareContext", () => {
  const value = { setQuestionnaireId: jest.fn(), setHasSymptoms: jest.fn(), setStdQuestionsFilled: jest.fn() };
  return { useQuestionnaire: () => value };
});

test("assessment failure preserves answers and allows a successful retry", async () => {
  const host = document.createElement("div"); document.body.appendChild(host);
  const root = createRoot(host);
  webApiInstance.get.mockImplementation(async (url) => ({ data: { result: url.startsWith("Question/") ? [{ id: 1, questionText: "What would you like to discuss?", questionType: 21, options: [] }] : false } }));
  webApiInstance.post.mockRejectedValueOnce(new Error("offline")).mockResolvedValueOnce({ data: { statusCode: 200 } });
  try {
    await act(async () => root.render(<MemoryRouter><AuthContext.Provider value={{ authToken: "test-token" }}><Assessment journey /></AuthContext.Provider></MemoryRouter>));
    await act(async () => host.querySelector("button.j-card").click());
    const input = host.querySelector("#question-1");
    await act(async () => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(input, "Routine testing"); input.dispatchEvent(new Event("input", { bubbles: true })); });
    const submit = () => [...host.querySelectorAll("button")].find((button) => button.textContent === "Complete assessment");
    await act(async () => submit().click());
    expect(host.textContent).toContain("We couldn't save your assessment");
    expect(input.value).toBe("Routine testing");
    expect(submit().disabled).toBe(false);
    await act(async () => submit().click());
    expect(host.textContent).toContain("Assessment complete.");
    expect(webApiInstance.post).toHaveBeenLastCalledWith("/QuestionaireResponse", { questionaireId: 2, responses: [{ questionId: 1, textAnswer: "Routine testing" }] }, { headers: { Authorization: "Bearer test-token" } });
  } finally { await act(async () => root.unmount()); host.remove(); }
});
