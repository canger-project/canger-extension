import "@pages/newtab/Newtab.css"
import "@pages/newtab/Newtab.scss"
import withErrorBoundary from "@src/shared/hoc/withErrorBoundary"
import withSuspense from "@src/shared/hoc/withSuspense"

const Newtab = () => {
  return <div className="App">new tab</div>
}

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>)
