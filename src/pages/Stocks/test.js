import React from "react";

const NumberOfSharesInput = ({
  index,
  handleInputChange,
  selectedCommentIndex,
}) => {
  return (
    <div
      id={`table-inner-5-${index}`}
      className={`NumberOfShares ${
        index === selectedCommentIndex ? "selected-input" : ""
      }`}
    >
      <label>
        <input
          type="text"
          placeholder="Text Field"
          onChange={(e) => handleInputChange(e, index)}
        />
      </label>
    </div>
  );
};

const Datab = () => {
  const [selectedCommentIndex, setSelectedCommentIndex] = useState([]);
  const [selectedComments, setSelectedComments] = useState([]);

  const handleCheckboxChange = (e, index) => {
    if (e.target.checked) {
      if (!selectedCommentIndex.includes(index)) {
        setSelectedCommentIndex([...selectedCommentIndex, index]);
        setSelectedComments([
          ...selectedComments,
          {
            numShares: parseInt(
              e.target
                .closest(".table-inner-main")
                .querySelector(".NumberOfShares input").value
            ),
          },
        ]);
      }
    } else {
      //  DO
    }
  };

  const handleInputChange = (e, index) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      const updatedComments = [...selectedComments];
      if (updatedComments[index]) {
        updatedComments[index].numShares = value;
        setSelectedComments(updatedComments);
      }
    }
  };

  let commentsData = useMemo(() => {
    // setComments(datafire);
    let computedComments = comments;
  }, []);

  return (
    <>
      <div className="table-body-col">
        {commentsData.map((comment, index) => (
          <div className="table-inner-main" key={index}>
            <div id="table-inner-1" className="RadioButton">
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, index)}
                checked={selectedCommentIndex.includes(index)}
                name="tableCheckbox"
              />
            </div>

            <div id="table-inner-4" className="DiviYield">
              <h4>{comment.DividendYield}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Datab;
