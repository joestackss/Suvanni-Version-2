const SelectedStocksTable = ({ indexing, onInputChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
    onInputChange(e, indexing);
  };

  return (
    <div>
      <label>
        Enter Number of Shares:
        <input type="text" value={inputValue} onChange={handleInput} />
      </label>
    </div>
  );
};

const Datab = ({ numShares }) => {
  const [selectedCommentIndex, setSelectedCommentIndex] = useState([]);
  const [selectedComments, setSelectedComments] = useState([]);
  const [result, setResult] = useState(0);
  const [result2, setResult2] = useState(0);

  const handleCheckboxChange = (e, index) => {
    if (e.target.checked) {
      if (!selectedCommentIndex.includes(index)) {
        setSelectedCommentIndex([...selectedCommentIndex, index]);
        setSelectedComments([
          ...selectedComments,
          {
            companyName: e.target
              .closest(".table-inner-main")
              .querySelector(".CompanyName h4").textContent,
            cmp: parseInt(
              e.target
                .closest(".table-inner-main")
                .querySelector(".CMP h4")
                .textContent.replace("₹", "")
            ),
            numShares,
            dividendYield: parseFloat(
              e.target
                .closest(".table-inner-main")
                .querySelector(".DiviYield h4").textContent
            ),
          },
        ]);
      }
    } else {
      const selectedIndex = selectedCommentIndex.indexOf(index);
      setSelectedCommentIndex(selectedCommentIndex.filter((i) => i !== index));
      setSelectedComments((selectedComments) => {
        const newComments = [...selectedComments];
        newComments.splice(selectedIndex, 1);
        return newComments;
      });
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
    let computedComments = comments;
  }, []);

  return (
    <>
      <SelectedStocksTable
        indexing={selectedCommentIndex}
        onInputChange={handleInputChange}
      />
      <div>
        {commentsData.map((comment, indexes) => (
          <div className="table-inner-main" key={indexes}>
            <div className="table-checkbox">
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, indexes)}
              />
            </div>
            <div className="CompanyName">
              <h4>{comment.companyName}</h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
