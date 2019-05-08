let formTag = function () {
  return `
  <div class="card p-2">
    <div class="card-body">
      <h5 class="card-title">Create Tag</h5>
      <hr />
      <form class="mt-3">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" name="name" class="form-control" />
        </div>
        <button type="button" class="btn btn-block border mt-3">
          Save
        </button>
      </form>
    </div>
  </div>
  `
}
